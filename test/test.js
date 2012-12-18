var EventEmitter = require('events').EventEmitter;

var test = require('tap').test;
var bunyan = require('bunyan');

var serializers = require('../serializers.js');
var logemitter = new EventEmitter;
var logger = bunyan.createLogger({
    serializers: serializers,
    stream: {
        write: function(str) {
            logemitter.emit('log', JSON.parse(str));
        },
        end: function() {
            logemitter.emit('end');
        }
    },
    name: 'test-logger'
})

test('serializers', function(t) {
    t.test('req', function(t) {
        var reqObj = {
            connection: {
                remoteAddress: '127.0.0.1',
                remotePort: '1234'
            },
            url: '/foo/bar',
            method: 'GET',
            headers: {
                'foo': 'bar'
            }
        }
        var child = logger.child({
            req: reqObj
        });
        reqObj.method = 'POST';
        logemitter.once('log', function(obj) {
            t.equal(obj.req.method, 'POST');
            t.equal(obj.req.url, '/foo/bar');
            t.end();
        });
        child.info('hello, world');
    });

    t.test('res', function(t) {
        var resObj = {
            statusCode: 200,
            _header: {}
        }
        var child = logger.child({
            res: resObj
        });
        resObj.statusCode = 418;
        resObj._header = 'hello, world';
        logemitter.once('log', function(obj) {
            t.equal(obj.res.statusCode, 418);
            t.equal(obj.res.header, 'hello, world');
            t.end();
        });
        child.info('hello, world');
    });
    t.end();
});