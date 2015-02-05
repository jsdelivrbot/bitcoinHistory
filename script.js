(function () {

    var request = new XMLHttpRequest();
    request.open('GET', 'http://amodar.github.io/bitcoinHistory/history.json', true);
    
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            
            var jsonData = JSON.parse(request.responseText);
            var bitcoinData = [];
            var average = [];
            var high = [];
            var low = [];
            var dates = [];
            
            for (var i = 0; i < jsonData.length; i++) {
                var date = new Date(jsonData[i].datetime);
                
                bitcoinData.push(jsonData[i]);
                average.push(jsonData[i].average);
                high.push(jsonData[i].high);
                low.push(jsonData[i].low);
                dates.push(date);
            }
            
            average.unshift("average");
            high.unshift("high");
            low.unshift("low");
            dates.unshift("x");
            
            var chart = c3.generate({
                data: {
                    x: 'x',
                    columns: [
                        dates,
                        low,
                        average,
                        high
                    ],
                    types: {
                        low: 'area-step',
                        average: 'area-step',
                        high: 'area-step'
                    },
                    groups: [['low', 'average', 'high']],
                    order: false
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        localtime: false,
                        tick: {
                            format: '%Y-%m-%d'
                        }
                    },
                    y: {
                        label: {
                            text: "euro",
                            position: 'outer-middle'
                        }
                    }
                }
            });
        } else {
            // We reached our target server, but it returned an error
            console.log('target server error');
        }
    };
    
    request.onerror = function() {
        // There was a connection error of some sort
        console.log('request error');
    };
    
    request.send();
    
}());
