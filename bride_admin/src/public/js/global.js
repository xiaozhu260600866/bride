var rootElement = document.body;

var newElement = document.createElement("div");

newElement.id = "share-overlay";

//var newElementHtmlContent = document.createTextNode(share);
rootElement.appendChild(newElement);
var loading = '<div id="loadingToast" class="weui_loading_toast" style="display:none;">';
    loading+=' <div class="weui_mask_transparent"></div>';
    loading+=' <div class="weui_toast">';
    loading+=' <div class="weui_loading">';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_0"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_1"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_2"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_3"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_4"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_5"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_6"></div>';
    loading+='  <div class="weui_loading_leaf weui_loading_leaf_7"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_8"></div>';
    loading+='<div class="weui_loading_leaf weui_loading_leaf_9"></div>';
    loading+=' <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
    loading+='<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
    loading+='</div>';
    loading+='<p class="weui_toast_content">数据加载中</p>';
    loading+='</div>';
    loading+='</div>'; 
 $("body").append(loading);

