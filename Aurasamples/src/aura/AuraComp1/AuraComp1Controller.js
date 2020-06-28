({
    //新規作成画面を呼び出し、force:recordDataで受信したレコード情報を初期値として差し込んで表示
    doInit : function(component, event, helper) {
        
        var createRecordEvent = $A.get("e.force:createRecord");
        
        /* 新規作成画面にパラメータを設定
         * entityApiName：対象オブジェクト
         * defaultFieldValues：初期値を差し込む項目
        */
        createRecordEvent.setParams({
            "entityApiName": "Contact",
            "defaultFieldValues":{
                "Phone":component.get("v.rec.Phone"),
                "Email":"test@testcompany.co.jp",
                "Description":component.get("v.rec.Description"),
                "MailingStreet":component.get("v.rec.BillingStreet"),
                "MailingCity":component.get("v.rec.BillingCity"),
                "MailingState":component.get("v.rec.BillingState"),
                "MailingPostalCode":component.get("v.rec.BillingPostalCode"),
                "MailingCountry":component.get("v.rec.BillingCountry"),
                "AccountId":component.get("v.recordId")
            }
        });
        
        //新規作成画面を表示
        createRecordEvent.fire();
        }
})