// Rebase require directory
requirejs.config({
	baseUrl: "lib",
	paths: {
		activity: "../js"
	}
});

// Vue main app
const app = Vue.createApp({
	components: {
		"icon": Icon,
		"icon-button": IconButton,
		"search-field": SearchField,
		"popup": Popup
	},
	data() {
		return {
			message: "Sugarizer in Vue",
			products: [
				{ name: "Keyboard", price: 44, category: 'Accessories'},
				{ name: "Mouse", price: 20, category: 'Accessories'},
				{ name: "Monitor", price: 399, category: 'Accessories'},
				{ name: "Dell XPS", price: 599, category: 'Laptop'},
				{ name: "MacBook Pro", price: 899, category: 'Laptop'},
				{ name: "Pencil Box", price: 6, category: 'Stationary'},
				{ name: "Pen", price: 2, category: 'Stationary'},
				{ name: "USB Cable", price: 7, category: 'Accessories'},
				{ name: "Eraser", price: 2, category: 'Stationary'},
				{ name: "Highlighter", price: 5, category: 'Stationary'}
			],
			filterProducts: null,
			showPopup: false,
			popupData: null,
			popupX: null,
			popupY: null,
			popupDummyData: {
				"4": {
					name: "Keyboard", price: 44, category: 'Accessories'
				},
				"5": {
					name: "MacBook Pro", price: 899, category: 'Laptop'
				}
			}
		}
	},
	mounted() {
		this.filterProducts=this.products
	},
	watch: {
		filterProducts: function(newData, oldData) {
			this.filterProducts= newData
		}, 
	},
	methods: {
		// Icon component
		changeColor() {
			this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
			this.$refs.icon2.colorData=Math.floor(Math.random() * 179);
		},
		changePosition() {
			this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.yData=Math.floor(Math.random() * 100) + 1;
		},
		changeSize() {
			this.$refs.icon1.sizeData=Math.floor(Math.random() * 80) + 20;
			this.$refs.icon2.sizeData=Math.floor(Math.random() * 80) + 20;
		},
		// IconButton component
		testFunction: function (event) {
			// this.$refs.icon1.iconData= "icons/star.svg"
			this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
			// this.$refs.buttonIcon1.disabledData= "text changed"
			this.$refs.buttonIcon1.textData= "text changed"
		},
		// SearchField component
		searchFunction(searchInput) {
			this.filterProducts = this.products.filter((product) => {
				return product.name.toUpperCase().includes(searchInput.toUpperCase())
			})
		},
		// Popup component
		showPopupFunction(e) {
			if(!this.$refs.popup.timer  && !this.popupEvent) {
				var itemId;
				if(e.target.tagName=='svg')
					itemId= e.target.parentElement.id
				else if(e.target.tagName=='use')
					itemId= e.target.parentElement.parentElement.id
				else
					itemId= e.target.id;
				var obj= JSON.parse(JSON.stringify(this.popupDummyData))
				this.popupData= obj[itemId];
				this.popupX= e.clientX;
				this.popupY= e.clientY;
				this.showPopup= true
			}
		},
		removePopupFunction(e) {
			this.popupData= null
			this.popupX= null
			this.popupY= null
			this.showPopup= false
			this.$refs.popup.timer= false
		}
	},
});

app.mount('#app');