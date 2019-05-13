# jc_colorPicker
Native and Simple color Picker
include Javascript file jc_colorPicker.js and enjoy

# Intro
include js File on head

    <script src="js/jc_colorPicker.js"></script>
    
# API
<b>Parameter</b>

    JCpicker({width: , height: }, (Element)target, (callback)response, (String)type, (Bool)panel);

* width     = "this width frame".<br>
* height    = "this height frame".<br>
* target    = "target prepend Element".<br>
* response  = "callback function response".<br>
* type      = "response type" => rgb or hex.<br>
* panel     = "show panel GUI for information R G B and HEX".<br>

<b>Example</b>
  
    let myPicker = new JCpicker({width: 150, height: 150}, myDiv, myRes, 'rgb', true);
    
<b>Note</b>
* callback response and Element target Prepend must be declared <b>before</b> request <b>new JCpicker()</b>

<b>Example Declared</b>

    let myDiv = document.querySelector('#myDiv');
    let myRes   = (event) => {
      document.body.style.background = event;
    }

    let myPicker = new JCpicker({width: 150, height: 150}, myDiv, myRes, 'rgb', true);

# Full Example
    <!DOCTYPE html>
    <html>
    <head>
      <title>JC Color</title>
      <style type="text/css">
        #jc_colorPicker {
          /* CSS untuk myPicker*/
        }
      </style>
      <script src="js/jc_colorPicker.js"></script>	
    </head>
    <body>

    <button onclick="myStart();">show</button>
    <button onclick="myStop()">hide</button>

    <div id="myDiv"></div>

    <script>
      let myDiv 	= document.querySelector('#myDiv');

      let myRes = (event) => {
        document.body.style.background = event;
      }

      let myPicker = new JCpicker({width: 150, height: 150}, myDiv, myRes, 'rgb', true);

      function myStart() {
        myPicker.on();
      }

      function myStop() {
        myPicker.off();
      }

    </script>

    </body>
    </html>
