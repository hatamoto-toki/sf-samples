({
    //表示しているレコード及び子レコード情報を読み込み一括コピー
    doInit : function(component, event, helper) {
        
        var editRecordEvent = $A.get("e.force:editRecord");
        
        //Apexコントローラよりコピー処理を起動
        var action = component.get("c.getAccWithContacts");
        action.setParams({ "accId" : component.get("v.recordId") });
        
        //アクション成功時：コピー取引先のIDを格納
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.newRecId",response.getReturnValue());
            }
            else{
                console.log(response.getReturnValue());
            }
        });
        
        //アクションを実行
        $A.enqueueAction(action);
    },
    
    //保存ボタン
    save : function(component, event) {
        // Save the record
        component.find("edit").get("e.recordSave").fire();
    },
    
    //キャンセルボタン
    cancel : function(component, event) {
        // コピーしたデータを破棄
        var action = component.get("c.delAccWithContacts");
        action.setParams({ "accId" : component.get("v.newRecId") });
        $A.enqueueAction(action);
        
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    },
    
    //編集終了後の処理
    handleSaveSuccess : function(component, event) {
        
        var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "type": "success",
            "title": "取引先が保存されました。",
            "message": "取引先および取引先責任者がコピーされました。"
        });
        
        //更新したデータのページに遷移
        var newRecord = $A.get("e.force:navigateToSObject");
        newRecord.setParams({
              "recordId": component.get("v.newRecId"), 
              "slideDevName": "related"
        });
        
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        
        //ウィンドウを閉じる
        resultsToast.fire();
        newRecord.fire();
        dismissActionPanel.fire();
    }
})