'use strict';

const Benchmark = require('benchmark'),
    _ = {
        indexOf: require('lodash/indexOf'),
    },
    array = [
        'element_1',
        'element_2',
        'element_3',
        'element_4',
        'element_5',
        'element_6',
        'element_7',
        'element_8',
        'element_9',
        'element_10',
        'element_11',
        'element_12',
        'element_13',
        'element_14',
        'element_15',
        'element_16',
        'element_17',
        'element_18',
        'element_19',
    ];

(new Benchmark.Suite)
    .add('indexOf', () => {
        array.indexOf('element_10') != -1;
    })
    .add('_.indexOf', () => {
        _.indexOf(array, 'element_10');
    })
    .add('in', () => {
        'element_10' in array;
    })
    .add('includes', () => {
        array.includes('element_10');
    })
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', function() {
        const name = this.filter('fastest').map('name');
        console.log(`Fastest is ${name}`);
    })
    .run({async: false});
