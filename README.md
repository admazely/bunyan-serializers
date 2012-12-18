# bunyan-serializers

Some customized serializers for bunyan.

## example

```javascript
    var serializers = require('bunyan-serializers');
    var bunyan = require('bunyan');

    var logger = bunyan.createLogger({
        serializers: serializers,
        stream: process.stdout,
        name: 'test'
    });

    var server = http.createServer(function(req, res) {
        logger.info({req: req, res: res}, 'Got a request and a response');
    });
    server.listen(8080);
```

## differences from bunyan.stdSerializers.

In the standard serializer for bunyan the req- and res-objects are serialized when creating a child-logger, like

```javascript
    var child = bunyan.child({
        req: reqObj,
        res: resObj
    });
```
This means that that if the reqObj or resObj get changed after the child has been initated those changes will not be logged properly.
The serializers for req and res-objects are in this project not serialized when a child is created but rather when you actually log.

A serializer for an err-object is also attached for completeness.