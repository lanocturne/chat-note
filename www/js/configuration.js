"use strict";

angular.module('config', [])

    //.constant('REST', {pages: 'http://devint2.captora.com/pagesrest/', node: 'http://54.219.58.180:9092/',
    //    dataRpm: 'https://nlp.captora.com/',
    //    resource: 'http://54.219.58.180:8080/'
    //});
    .constant('REST', {
        dataRpm: 'https://nlp.captora.com/',
        resource: 'http://54.219.58.180:8080/',
        pages: 'http://app.captora.com/pagesrest/',
        node: 'http://192.168.1.76:9092/'
    });