[![Build Status](https://travis-ci.org/Leadformance/bridge-metrics.svg?branch=master)](https://travis-ci.org/Leadformance/bridge-metrics) [![codecov](https://codecov.io/gh/Leadformance/bridge-metrics/branch/master/graph/badge.svg)](https://codecov.io/gh/Leadformance/bridge-metrics)

# bridge-metrics

Bridge metrics lib

You can use Prometheus metrics like this:

```
'use strict';

const prometheusMetrics = require('bridge-metrics').prometheusMetrics;

// This will get the content-type for prometheus
cont contentType = prometheusMetrics.getContentType();

// You will get all the prometheus metrics
cont allMetrics = prometheusMetrics.getAllMetrics();

```

With express you can use it like this:

```
metrics: (req, res) => {
    res.set('Content-Type', contentType);
    res.end(allMetrics);
}
```
