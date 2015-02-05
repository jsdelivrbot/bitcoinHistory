(function () {

    var request = new XMLHttpRequest();
    request.open('GET', 'http://broowse.com/history.json', true);
    
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var jsonData = JSON.parse(request.responseText);
            var bitcoinData = [];
            var average = [];
            var high = [];
            var low = [];
            var dates = [];
            //turn json to js array
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
            
            console.log(dates);
            
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
                            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                        },
                        groups: [['low', 'average', 'high']],
                        order: false
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            // if true, treat x value as localtime (Default)
                            // if false, convert to UTC internally
                            localtime: false,
                            tick: {
                                format: '%Y-%m-%d'
                            }
                        }
                    }
                    
                    
                    
                    
                });            
            
            
        } else {
            // We reached our target server, but it returned an error
            
        }
    };
    
    request.onerror = function() {
        // There was a connection error of some sort
    };
    
    request.send();
    
}());
