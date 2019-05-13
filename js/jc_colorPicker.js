/* -------------------------------------------------------------------------------------------------------------------------------
# JCpicker 	: Simple Color Picker;
# created by 	: JC Programs;
------------------------------------------------------------------------------------------------------------------------------- */
class JCpicker {
	constructor(frame, targetFrame, callback, reType, panel) {
		const doc = document; const $ = (tg) => {const trg = doc.querySelector(tg); return trg}; const $$ = (tg) => {const trg = doc.querySelectorAll(tg); return trg};

		let jc_frameWidth, jc_frameHeight;

		if ( frame !== undefined || frame !== null 
			|| frame.width 	!== undefined || frame.width  !== null 
			|| frame.height !== undefined || frame.height !== null ) 
		{
			jc_frameWidth 	= frame.width;
			jc_frameHeight 	= frame.height;
		}
		else {
			jc_frameWidth 	= 225; // Nilai Default Width
			jc_frameHeight 	= 225; // Nilai Default Height
		}
		
		// ===========================================================================================================
		// Construct Executor 
		const _construct = {
			tag : ({tag, attrib, textNode, setCSS, target}) => {
				const 	el = doc.createElement(tag);
						el.style.cssText = setCSS;
						el.setAttribute(attrib.name, attrib.value);

				if (textNode !== undefined) {
					const	tx = doc.createTextNode(textNode);
							el.appendChild(tx);
				}

				if (target !== null || target !== undefined) {

					if (target.exec == "frame") {
						targetFrame.prepend(el);
					}
					else if (target.exec == "append") {
						$(target.element).append(el);
					}
					else if (target.exec == "prepend") {
						$(target.element).prepend(el);
					}
					else if (target.exec == "appendChild") {
						$(target.element).appendChild(el);
					}
				}

				if (tag === "canvas") {
					_construct.draw();
				}
			},
			draw : (circleX = 0, circleY = 0) => {
				const 	cv  = $('#cv_jc_ColorPicker'),
						ctx = cv.getContext('2d');
						cv.width 	= jc_frameWidth;
						cv.height 	= jc_frameHeight;

				// clear Rect
				ctx.clearRect(0, 0, cv.width, cv.height);
				
				// Create Linear Gradian untuk selector Color
				let gradient = ctx.createLinearGradient(0, 0, cv.width, 0);
					gradient.addColorStop(0, "rgb(255, 0, 0)");
					gradient.addColorStop(0.18, "rgb(255, 0, 255)");
					gradient.addColorStop(0.33, "rgb(0, 0, 255)");
					gradient.addColorStop(0.49, "rgb(0, 255, 255)");
					gradient.addColorStop(0.69, "rgb(0, 255, 0)");
					gradient.addColorStop(0.84, "rgb(255, 255, 0)");
					gradient.addColorStop(1, "rgb(255, 0, 0)");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, cv.width, cv.height);

					gradient = ctx.createLinearGradient(0, 0, 0, cv.height);
					gradient.addColorStop(0, "rgb(255, 255, 255, 1)");
					gradient.addColorStop(0.5, "rgb(255, 255, 255, 0)");
					gradient.addColorStop(0.5, "rgb(0, 0, 0, 0)");
					gradient.addColorStop(0.97, "rgb(0, 0, 0, 1)");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, cv.width, cv.height);

				// circle picker
				let jc_framePosition 	= $('#jc_colorPicker');

				let jc_frameX = jc_framePosition.offsetLeft - 7.5,
					jc_frameY = jc_framePosition.offsetTop - 7.5;

				let crcX = circleX - jc_frameX, 
					crcY = circleY - jc_frameY, 
					arcR = 5;

				if ( crcX < arcR ) {
					crcX = arcR;
				}

				else if ( crcX > cv.width ) {
					crcX = cv.width - arcR;
				}

				if ( crcY < arcR ) {
					crcY = arcR;
				}
				else if ( crcY > cv.height ) {
					crcY = cv.height - arcR;
				}

				ctx.beginPath();
				ctx.arc(crcX, crcY, arcR, 0, Math.PI * 2);
				ctx.strokeStyle = "#000";
				ctx.stroke();
				ctx.closePath();

				return {context: ctx, cX: crcX, cY: crcY};
			},

			hexa : (inR, inG, inB) => {
				if (inR !== null && inG !== null && inB !== null) {
					if (inR !== undefined && inG !== undefined && inB !== undefined) {
						let comHexa, hexR1, hexR2, hexG1, hexG2, hexB1, hexB2;
						let hexAry = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
						// R --------------------
						if (inR < 16) {
							hexR1 = '0';
							hexR2 = hexAry[inR];
						}
						else {
							hexR1 = hexAry[Math.floor(inR / 16)];
							hexR2 = hexAry[inR % 16];
						}

						// G --------------------
						if (inG < 16) {
							hexG1 = '0';
							hexG2 = hexAry[inG];
						}
						else {
							hexG1 = hexAry[Math.floor(inG / 16)];
							hexG2 = hexAry[inG % 16];
						}

						// B --------------------
						if (inB < 16) {
							hexB1 = '0';
							hexB2 = hexAry[inB];
						}
						else {
							hexB1 = hexAry[Math.floor(inB / 16)];
							hexB2 = hexAry[inB % 16];
						}

						// HEX COMBINE RGB -----
						if (comHexa !== null) {
							comHexa = String(hexR1) + String(hexR2) + String(hexG1) + String(hexG2) + String(hexB1) + String(hexB2);
						}
						else {
							comHexa = null;
						}

						return comHexa;
					}
					else {
						alert("ERROR! Data Color Undefined");
					}
				}
				else {
					alert("ERROR! Data Color Null");
				}
			}
		}

		// ===========================================================================================================
		// Regist all component
		const Register = function() {
			const newTag = () => {
				let jc_frameWidthPlush 	= 10,
					jc_frameHeightPlush = 10;

				if (panel !== undefined && panel !== null) {
					if (panel == true) {
						jc_frameWidthPlush  = 220;
						jc_frameHeightPlush = 10;
					}
				}

				_construct.tag({
					tag 		: "div", 
					attrib 		: {
						name 	: "id",
						value 	: "jc_colorPicker"
					},
					target 		: {
						exec 	: "frame"
					},
					setCSS 		: `
							box-shadow: 1px 1px 5px; 
							background: #eee; 
							margin: 0; 
							padding: 0px;
							width: ${String(jc_frameWidth + jc_frameWidthPlush)}px;
							height: ${String(jc_frameHeight + jc_frameHeightPlush)}px;
							border: 1px #ddd solid;
							border-radius: 5px;
							overflow:hidden;
						`
				});

				// Work Left -----------------
				_construct.tag({
					tag 		: "div", 
					attrib 		: {
						name 	: "id",
						value 	: "_jc_workLeft"
					},
					target 		: {
						element : "#jc_colorPicker",
						exec 	: "appendChild"
					},
					setCSS 		: `
							margin: 0; 
							padding: 5px; 
							width: ${String(jc_frameWidth)}px; 
							display: inline-block; 
							overflow: hidden;
						`
				});

				// Canvas -------------------
				_construct.tag({
					tag 		: "canvas", 
					attrib 		: {
						name 	: "id",
						value 	: "cv_jc_ColorPicker"
					},
					target 		: {
						element : "#_jc_workLeft",
						exec 	: "appendChild"
					},
					setCSS 		: `
							margin: 0; 
							padding: 0px;
							width: ${String(jc_frameWidth)}px; 
							height: ${String(jc_frameHeight)}px; 
							border: 1px #555 solid;
							display: inline-grid;
							overflow: hidden;
						`
				});

				if (panel !== undefined && panel !== null) {
					if (panel == true) {
						// Work Right -----------------
						_construct.tag({
							tag 		: "div", 
							attrib 		: {
								name 	: "id",
								value 	: "_jc_workRight"
							},
							target 		: {
								element : "#jc_colorPicker",
								exec 	: "appendChild"
							},
							setCSS 		: `
									margin: 0;
									margin-left: 5px; 
									padding: 0; 
									width: 200px; 
									height: ${String(jc_frameHeight + 11)}px; 
									display: inline-block; 
									overflow: hidden;
								`
						});

						// _jcLayout -----------------
						_construct.tag({
							tag 		: "div", 
							attrib 		: {
								name 	: "id",
								value 	: "_jcLayout"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							setCSS 		: `
									color: #fff; 
									margin: 0;
									margin-bottom: 10px;
									padding: 0px;
									width: 100%;
									border: 1px #ddd solid;
									height: 30%;
								`
						});

						// Label R --------------------
						_construct.tag({
							tag 		: "label", 
							attrib 		: {
								name 	: "for",
								value 	: "jc_r"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							textNode 	: "R ",
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
								`
						});

						// Input R --------------------
						_construct.tag({
							tag 		: "input", 
							attrib 		: {
								name 	: "id",
								value 	: "jc_r"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
									width: 50px;
									height: 20%;
									border: 1px #ddd solid;
								`
						});

						// Label G --------------------
						_construct.tag({
							tag 		: "label", 
							attrib 		: {
								name 	: "for",
								value 	: "jc_g"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							textNode 	: "G ",
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
								`
						});

						// Input G --------------------
						_construct.tag({
							tag 		: "input", 
							attrib 		: {
								name 	: "id",
								value 	: "jc_g"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
									width: 50px;
									height: 20%;
									border: 1px #ddd solid;
								`
						});

						// Label B --------------------
						_construct.tag({
							tag 		: "label", 
							attrib 		: {
								name 	: "for",
								value 	: "jc_b"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							textNode 	: "B ",
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
								`
						});

						// Input B --------------------
						_construct.tag({
							tag 		: "input", 
							attrib 		: {
								name 	: "id",
								value 	: "jc_b"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									padding: 0px;
									width: 50px;
									height: 20%;
									border: 1px #ddd solid;
								`
						});

						// Label HEX ------------------
						_construct.tag({
							tag 		: "label", 
							attrib 		: {
								name 	: "for",
								value 	: "jc_hexa"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							textNode 	: "Hex ",
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									width: 15%;
									margin-top: 5px;
									padding: 0px;
								`
						});

						// Input HEX -------------------
						_construct.tag({
							tag 		: "input", 
							attrib 		: {
								name 	: "id",
								value 	: "jc_hexa"
							},
							target 		: {
								element : "#_jc_workRight",
								exec 	: "appendChild"
							},
							setCSS 		: `
									color: #000;
									font-size: 15px; 
									margin: 0;
									margin-top: 5px;
									padding: 0px;
									width: 84%;
									height: 20%;
									border: 1px #ddd solid;
								`
						});
					}
				}
			},

			styleUp = () => {
				if (panel !== undefined && panel !== null) {
					if (panel == true) {
						let inR = $('#jc_r');
							inR.setAttribute('type', 'text');
						let inG = $('#jc_g');
							inG.setAttribute('type', 'text');
						let inB = $('#jc_b');
							inB.setAttribute('type', 'text');
						let inHex = $('#jc_hexa');
							inHex.setAttribute('type', 'text');
					}
				}
			}

			this.setReg = () =>{
				newTag(); styleUp();
			}
		}

		// ===========================================================================================================
		// response Closure all prosess
		const Active = function(r, g, b, hex) {
			let HEX 	= '#' + hex;
			let RGB 	= "rgb("+r+","+g+","+b+")";
			let type 	=  HEX; // Default Tipe Permintaan

			if (panel !== undefined && panel !== null) {
				if (panel == true) {
					$('#_jcLayout').style.background = RGB;
					$('#jc_r').value = r;
					$('#jc_g').value = g;
					$('#jc_b').value = b;
					
					$('#jc_hexa').value = HEX;		
				}
			}

			if (reType !== undefined && reType !== null) {
				if (reType == 'rgb') {
					type = RGB;
				}
				else if (reType == 'hex') {
					type = HEX;
				}
			}
			if (callback !== undefined && callback !== null) {
				callback(type);
			}
		}

		// ===========================================================================================================
		// response Event Mouse
		const activeMouse =  {
			mouseMove : (evX, evY) => {
				this.ex = evX;
				this.ey = evY;
			},

			mouseDown : () => {
				this.inv = setInterval(() => {
					let returnCtx = _construct.draw(this.ex, this.ey);
						
					let imgData = returnCtx.context.getImageData(returnCtx.cX, returnCtx.cY, 1, 1);
					let r = imgData.data[0],
						g = imgData.data[1],
						b = imgData.data[2],
						hex = _construct.hexa(r, g, b);

					new Active(r, g, b, hex); // Passing ke Active untuk manage layouting
				}, 1);
			},
			mouseInv 	: () => {
				clearInterval(this.inv);
			}
		}

		

		// ===========================================================================================================
		// Event List
		const set_listEvent = () =>{
			const cvPicker = $('#cv_jc_ColorPicker');

			const resRet = cvPicker.addEventListener('mousedown', () => {
				activeMouse.mouseDown();

				window.addEventListener('mousemove', (ev) => {
					let evX 	= ev.clientX - 14;
					let evY 	= ev.clientY - 14;
					activeMouse.mouseMove(evX, evY);
				});
			});


			cvPicker.addEventListener('mouseup', () => {
				activeMouse.mouseInv();
			});

			window.addEventListener('mouseup', () => {
				activeMouse.mouseInv();
			});
		}
		
		// ===========================================================================================================
		// Onload Window
		this.on = function() {
			const 	regist = new Register();
					regist.setReg(); 
			set_listEvent();
		}
		this.off = function() {
			$('#jc_colorPicker').remove();
		}
	}
}
