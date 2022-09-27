const Icon ={
    name: 'Icon',
    template: `<div :class="this.disabled? 'web-activity-disable icon' : 'icon'" :id="this.idData"></div>`,
	props: ['id','svgfile','color','size','x','y'],
    data() {
        return {
            idData: this.id,
            disabled: false,
            isSugarNative : false,
            sizeData: this.size? this.size: 55,
            colorData: this.color? this.color: 512,
            iconData: this.svgfile,
            xData: this.x ? this.x: 0,
            yData: this.y ? this.y: 0,
            _element: null
        }
    },
    mounted() {
        this.createIcon(this.svgfile, this.color, this.sizeData);
    },
    methods: {
        createIcon(svgfile, color, size, callback) {
            var parent =document.getElementById(this.id);
            if (!parent) {
                return null;
            }
            var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("class", "xo-color"+color);
            if (size) {
                svgElement.setAttribute("width", size+"px");
                svgElement.setAttribute("height", size+"px");
                svgElement.setAttribute("style", "margin: "+this.xData+"px "+this.yData+"px");
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
                var img = new Image();
                img.onload = function() {
                    if(this.width!=size) {
                        let intersectsize=this.width;
                        svgElement.setAttribute("viewBox", "0 0 "+intersectsize+" "+intersectsize);
                    }
                    else {
                        svgElement.setAttribute("viewBox", "0 0 55 55");
                    }
                }
                img.src = svgfile;
            }
            var useElement = document.createElementNS(svgElement.namespaceURI,"use");
            useElement.addEventListener('load', function() {
                if (callback) {
                    callback(svgElement);
                }
            })
            useElement.addEventListener('error', function() {
                console.log(svgfile+' error');
                if (callback) {
                    callback(null);
                }
            }) // Error loading SVG file
            var xref = svgfile+"#icon";
            useElement.setAttribute("xlink:href",xref);
            useElement.setAttribute("href",xref);
            this._element = svgElement;
            // Detection of error no symbol #icon is not possible due to closed ShadowDOM
            svgElement.appendChild(useElement);
            // for new Icon Data
            var child = parent.lastElementChild;
            while (child) {
                parent.removeChild(child);
                child = parent.lastElementChild;
            } 
            parent.appendChild(svgElement);
        }
    },
    watch: {
        colorData: function(newColor, oldColor) {
            var element = this._element;
            element.setAttribute("class", "xo-color"+newColor);
        }, 
        xData: function(newX, oldX) {
            var element = this._element;
            element.setAttribute("style", "margin: "+newX+"px "+this.yData+"px");
        }, 
        yData: function(newY, oldX) {
            var element = this._element;
            element.setAttribute("style", "margin: "+this.xData+"px "+newY+"px");
        }, 
        iconData: function(newIcon, oldIcon) {
            this.iconData= newIcon;
            this.createIcon(this.iconData, this.color, this.sizeData);
        }
    },
};

if (typeof module !== 'undefined') module.exports = { Icon }