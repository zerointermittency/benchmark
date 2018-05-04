'use strict';

const Benchmark = require('benchmark'),
    async = {
        map: require('async/map'),
    },
    bluebird = require('bluebird'),
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const testBluebirdPromise = val => new bluebird((resolve) => {
    resolve();
});

const testNativePromise = val => new Promise((resolve) => {
    resolve();
});

const testCallback = (val, callback) => {
    callback();
};

(new Benchmark.Suite)
    .add('async.map', {
        defer: true,
        fn: (deferred) => {
            async.map(array, testCallback, (err, results) => {
                deferred.resolve();
            });
        },
    })
    .add('bluebird.map with native promise', {
        defer: true,
        fn: (deferred) => {
            bluebird.map(array, testNativePromise)
                .then(() => deferred.resolve())
                .catch(() => deferred.reject());
        },
    })
    .add('bluebird.map with bluebird promise', {
        defer: true,
        fn: (deferred) => {
            bluebird.map(array, testBluebirdPromise)
                .then(() => deferred.resolve())
                .catch(() => deferred.reject());
        },
    })
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', function() {
        const name = this.filter('fastest').map('name');
        console.log(`Fastest is ${name}`);
    })
    .run({async: false});
