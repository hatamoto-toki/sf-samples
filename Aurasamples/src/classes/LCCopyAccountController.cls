public class LCCopyAccountController {
    
    //コンストラクタ(VFのみ必須)
    public LCCopyAccountController(ApexPages.StandardController controller){
    }
    
    //対象Accountおよび下位Contact全件を取得
    @AuraEnabled @RemoteAction
    public static String getAccWithContacts(ID accId){
        if(accId == null){
            return null;
        }else{
            Account acc =  [SELECT ID, Name, Phone, Description, BillingCity, BillingStreet, BillingState, BillingPostalCode, BillingCountry, 
                           (SELECT ID, LastName, FirstName, Phone, Email, Description, MailingCity, MailingStreet, MailingState, MailingPostalCode, MailingCountry FROM Contacts) 
                           FROM Account
                           WHERE ID = : accId]; 
            
            //Account、Contactをコピー
            Account newAcc = acc.clone(false, true);
            List<Contact> newCons = acc.contacts.deepclone();
            Savepoint sp = Database.setSavepoint();
            
            //コピーAccountの仮登録
            try{
                Insert newAcc;
            }catch(Exception e){
                Database.rollback(sp);
                return e.getMessage();
            }
            
            //コピーしたAccountにContactを紐付け
            for(Contact con : newCons){
                con.AccountId = newAcc.Id;
            }
            
            //コピーContactの仮登録
            try{
                Insert newCons;
            }catch(Exception e){
                Database.rollback(sp);
                return e.getMessage();
            }
            
            return newAcc.Id;
        }
    }
    //コピーAccountおよびContact全件を削除
    @AuraEnabled @RemoteAction
    public static void delAccWithContacts(ID accId){
        Delete new Account(ID = accId);
    }
}