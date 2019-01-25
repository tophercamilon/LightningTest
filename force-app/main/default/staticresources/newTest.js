describe('c:newEmployee', function () {
    it('verify mocked server method invocation in the init function', function (done) {
        var mockResponse = { 
            getState: function () { 
                return "SUCCESS";
            }, 
            getReturnValue: function () { 
                return [{"label": "Single", "value":"Single"},{"label": "Married", "value":"Married"}]; 
            } 
        };
        spyOn($A, "enqueueAction").and.callFake(function (action) {
            var cb = action.getCallback("SUCCESS");
            cb.fn.apply(cb.s, [mockResponse]);
        });
        $T.createComponent("c:newEmployee", {}, true)
            .then(function (component) {              
                expect(component.get("v.salesTransactionEventsList").length).toBe(2);
                expect(component.get("v.salesTransactionEventsList")[0]['label']).toContain("Single");
                done();
            }).catch(function (e) {
                done.fail(e);
            });
    });
});

describe('c:newEmployee', function () {
    it('verify data binding', function (done) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
           mm = '0'+mm
        } 

        today = mm + '/' + dd + '/' + yyyy;

        var newDD;
        var newDay = new Date();
        if(dd - 1 == 0){
	        newDD = dd + 1;
        }else{
	        newDD = dd - 1;
        }

        if(newDD<10) {
            dd = '0'+dd
        } 
        newDay  = mm + '/' + newDD + '/' + yyyy;

       $T.createComponent('c:newEmployee', {startDate: newDay}, true)
          .then(function (component) {
            
             expect(component.find("startDatecmp").get("v.value")).toBe(today);
             done();
       }).catch(function (e) {
             done.fail(e);
       });
    });
 });