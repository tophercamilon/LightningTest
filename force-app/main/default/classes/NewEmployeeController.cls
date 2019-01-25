global class NewEmployeeController {
    @AuraEnabled
    global static List<Map<String, String>> getMaritalStatus() {
        
        try {   
            
            List<Map<String, String>> items = new List<Map<String, String>>();
            
            Schema.DescribeFieldResult fd = Employee__c.Marital_Status__c.getdescribe();
            list<Schema.PickListEntry> pc = fd.getpicklistvalues();
            for (Schema.PickListEntry f : pc) {       
                items.add(new Map<String, String>{'value' => f.getvalue() , 'label' => f.getlabel()});
            }      
            
            return items;
            
        } catch(Exception e) {            
            
            AuraHandledException exc = new AuraHandledException('Error in loading.');
            exc.setMessage('Error in loading.');
            system.debug(exc);
            throw exc;
            
        }
    }
}