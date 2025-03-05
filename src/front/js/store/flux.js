const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


					 login: async (email, password) => {
						//console.log(email, password);
						const myHeaders = new Headers();
						myHeaders.append("Content-Type", "application/json");
						const raw = JSON.stringify({
							"email": email,
							"password": password
						});
						const requestOptions = {
							method: "POST",
							headers: myHeaders,
							body: raw
						};
						try {
							const response = await fetch("https://glorious-garbanzo-x5vw5j6w55gxhpvqr-3001.app.github.dev/api/login", requestOptions);
							const result = await response.json();
							console.log(response);
							console.log(result)
							if (response.status !== 200){
								return false
							}
							localStorage.setItem("token", result.access_token)
							return true
						} catch (error) {
							console.error(error);
						};
				
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
