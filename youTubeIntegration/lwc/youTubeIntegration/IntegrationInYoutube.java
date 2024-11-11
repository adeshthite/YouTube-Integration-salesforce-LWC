public class IntegrationInYoutube {
	
    @AuraEnabled(cacheable=true)
	Public Static String getYoutRecord(String searchQueray){

        String sanitizedSearchQuery = searchQueray.replaceAll(' ','+');

		    String apikey = API_TokenController.API_Key;      //apex controller 
         
        
       HttpRequest req = new HttpRequest();
       req.setEndpoint('callout:Youtube?part=snippet&q='+ sanitizedSearchQuery +'&key='+apikey);
       req.setMethod('GET');
       HttpResponse res = New HttpResponse();
       Http ht = new Http();
       res = ht.send(req);
       System.debug('--- Weather data---'+res.getBody());
		   return res.getBody();
    }
}
