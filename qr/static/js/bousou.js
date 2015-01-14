var bousou={
"a":"亞阿悪愛",
"i":"威異慰",
"u":"宇憂優",
"e":"江餌",
"o":"悪汚",
"ka":"香火華",
"ki":"鬼飢貴危",
"ku":"苦",
"ke":"怪",
"ko":"孤虚虎",
"sa":"沙娑",
"shi":"死刺",
"su":"寿須朱珠",
"se":"勢聖誠",
"so":"剃尊走",
"ta":"汰駄絶",
"chi":"血魑恥致",
"tsu":"津",
"te":"帝天",
"to":"斗屠闘壽",
"na":"那泣",
"ni":"煮尼",
"nu":"奴",
"ne":"音",
"no":"乃能",
"ha":"覇破",
"hi":"卑非",
"fu":"風浮怖不",
"he":"兵柄",
"ho":"歩",
"ma":"魔摩",
"mi":"魅",
"mu":"夢無",
"me":"女",
"mo":"喪魍",
"ra":"羅蘭薇嵐",
"ri":"璃理離詈",
"ru":"瑠流",
"re":"礼麗零隸烈",
"ro":"露髏",
"ya":"夜耶",
"yu":"遊優勇",
"yo":"世夜",
"wa":"我",
"wo":"於",
"n":"云",
"ga":"牙餓",
"gi":"義戯",
"gu":"愚",
"ge":"外",
"go":"後豪冴",
"za":"惨罪斬",
"zi":"侍自尽仁",
"zu":"頭逹",
"ze":"贅",
"zo":"憎",
"da":"駄堕陀",
"de":"泥伝",
"do":"奴怒道",
"ba":"婆薔",
"bi":"美毘",
"bu":"武舞仏",
"be":"米",
"bo":"暴",
"pa":"破爆驀発",
"pi":"比",
"pu":"布",
"pe":"辺",
"po":"砲",
"-":"",
"—":"",
"\"":"",
"#":"",
"%":"",
"(":"",
")":"",
"*":"",
",":"",
"、":"",
".":"",
"/":"",
"：":"",
"；":"",
"\\":"",
"`":"",
"“":"",
"”":"",
"+":"",
"0":"0",
"1":"1",
"2":"2",
"3":"3",
"4":"4",
"5":"5",
"6":"6",
"7":"7",
"8":"8",
"9":"9",
"b":"B",
"c":"C",
"d":"D",
"f":"F",
"g":"G",
"h":"H",
"j":"J",
"k":"K",
"l":"L",
"m":"M",
"p":"P",
"q":"Q",
"r":"R",
"s":"S",
"t":"T",
"v":"V",
"w":"W",
"x":"X",
"y":"Y",
"z":"Z"
};
function bousoukanji(str)
{var romaji,romaji2;
 var kanjiA,kanjiO,kanjiS="",y="";
 for(i=0;i<str.length;)
 {romaji=str.substr(i,3);
  romaji2=str.substr(i,2);	
    if(romaji=="shi"||romaji=="chi"||romaji=="tsu")
      {kanjiA=bousou[romaji];
      for(j=0;j<kanjiA.length;j++)
      {
       kanjiO=kanjiA.substr(j,1);
       y=y+'<option value="'+kanjiO+'">'+kanjiO+'</option><br/>'
      }
     kanjiS=kanjiS+romaji+':<select class="kanjiselect">'+y+'</select>';y="";
     i=i+3;
     } 
    else if(romaji2=="ka"||romaji2=="ki"||romaji2=="ku"||romaji2=="ke"||romaji2=="ko"||romaji2=="sa"||romaji2=="su"||romaji2=="se"||romaji2=="so"||romaji2=="ta"||romaji2=="te"||romaji2=="to"||romaji2=="na"||romaji2=="ni"||romaji2=="nu"||romaji2=="ne"||romaji2=="no"||romaji2=="ha"||romaji2=="hi"||romaji2=="fu"||romaji2=="he"||romaji2=="ho"||romaji2=="ma"||romaji2=="mi"||romaji2=="mu"||romaji2=="me"||romaji2=="mo"||romaji2=="ra"||romaji2=="ri"||romaji2=="ru"||romaji2=="re"||romaji2=="ro"||romaji2=="ya"||romaji2=="yu"||romaji2=="yo"||romaji2=="wa"||romaji2=="wo"||romaji2=="ga"||romaji2=="gi"||romaji2=="gu"||romaji2=="ge"||romaji2=="go"||romaji2=="za"||romaji2=="zi"||romaji2=="zu"||romaji2=="ze"||romaji2=="zo"||romaji2=="da"||romaji2=="de"||romaji2=="do"||romaji2=="ba"||romaji2=="bi"||romaji2=="bu"||romaji2=="be"||romaji2=="bo"||romaji2=="pa"||romaji2=="pi"||romaji2=="pu"||romaji2=="pe"||romaji2=="po")
    {
     kanjiA=bousou[romaji2];
      for(j=0;j<kanjiA.length;j++)
      {
       kanjiO=kanjiA.substr(j,1);
       y=y+'<option value="'+kanjiO+'">'+kanjiO+'</option><br/>'
      }
     kanjiS=kanjiS+romaji2+':<select class="kanjiselect">'+y+'</select>';y="";
     i=i+2; 
    }
    else{romaji=str.substr(i,1)
      kanjiA=bousou[romaji];
      for(j=0;j<kanjiA.length;j++)
      {
       kanjiO=kanjiA.substr(j,1);
       y=y+'<option value="'+kanjiO+'">'+kanjiO+'</option><br/>'
      }
     kanjiS=kanjiS+romaji+':<select class="kanjiselect">'+y+'</select>';y="";
     i++; }  
 }
return kanjiS;
}
function showkanji()
{var x=document.getElementById("list");
var y="";
for (var i=0;i<x.length;i++)
  {
  y=y+x.elements[i].value;
  }
  return y;}
$(document).ready(function(){
  $(".field").keyup(function(){
    $("#list").html(bousoukanji(this.value))
  });
});
$(document).ready(function(){
  $(".field").keyup(function(){
    $("#list2").html(showkanji())
  });
});
$(document).ready(function(){
  $(document).on("change",function(){
   $("#list2").html(showkanji())
  });
});

