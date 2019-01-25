({
	testNewEmployee : function(component, event, helper) {
        
        var action = component.get('c.getMaritalStatus');
        
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();            
            if (state === "SUCCESS") {
                
                var eventsList = response.getReturnValue();
                for (var key in eventsList[0]) {
                    if (key == 'value') {
                        component.set('v.selectedEvent',eventsList[0][key]);
                    }
                }               
                component.set('v.salesTransactionEventsList ', response.getReturnValue());
                
            } else if (state === "ERROR") {
                
                var errorMsg = "";
                for (i = 0; i < action.getError().length - 1; i++) {
                    errorMsg += action.getError()[i].message + "\n";
                }       
                
                component.find('notifLib').showNotice({
                    "variant": "error",
                    "header": "Error",
                    "message": "Error in loading. " + errorMsg,
                    closeCallback: function() {
                        $A.get("e.force:closeQuickAction").fire();
                        $A.get("e.force:refreshView").fire();                        
                    }
                });
                
            }
        }));
        $A.enqueueAction(action);
        
    },
})