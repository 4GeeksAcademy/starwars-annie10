const getState = ({ getStore, getActions, setStore }) => {
	const host = "https://playground.4geeks.com/contact";
	const user = "annie";
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			cohorte: 'spain-93',
			user: 'annie',
			is_logged: false,
			alert: { text: 'Mi primer Alert', visible: true, background: 'success' },
			listContacts: [],
			currentContact: {},
			people: [],
			starships: [],
			planets: [],
			starwarsURL: "https://www.swapi.tech/api",
			activePage: "planets",
            favorites:[],
			currentItemDetails:{}
		},
		actions: {
			setFavorite: (favorite) => {
            if(getStore().favorites.includes(favorite)){
		    setStore({favorites:getStore().favorites.filter((item)=>item!=favorite)})
			}else{
			setStore({favorites:[...getStore().favorites,favorite]})
			} 
            console.log("Soy favoritos",getStore().favorites);
			},
			getItemsDetails: async (uri, id) => {
                setStore({isLoading: true})
                const options = { method: 'GET'}
                const response = await fetch( uri, options)
                if (!response.ok) {
                    console.log("ERROR: ", response.status, response.statusText)
                    return
                }
                const data = await response.json()
                setStore({currentItemDetails: {...data.result.properties, uid: id}})
                console.log("soy details", data.result.properties)
                setStore({isLoading: false})
            },
			setActivePage: (page) => { 
				setStore({activePage: page})
			}, 
			getStarwarsData: async (page) => {

				const uri = `${getStore().starwarsURL}/${page}`
				const options = { method: "GET"}
				const response =  await fetch(uri, options)
				if (!response.ok) {
					console.log("ERROR: ", response.status, response.statusText)
					return
				}
				const data = await response.json();
				setStore({[page]: data.results });
			},
			setCurrentContact: (contact) => {setStore({currentContact: contact})},
			createContact: async (newContact) => { 
				console.log(newContact)
				const uri = `${host}/agendas/${user}/contacts`
				const options = { method: "POST", body: JSON.stringify(newContact), headers: {'Content-Type': 'application/json'} };
				const response = await fetch( uri, options );
				if (!response.ok) {
					console.log("ERROR: ", response.status, response.statusText)
					return 
				} 
				getActions().getContacts()
			 },
			setUser: (newvalue) => { setStore({ user: newvalue }) },
			setAlert: (newAlert) => { setStore({ alert: newAlert }) },
			getContacts: async () => {
				const uri = `${host}/agendas/${user}/contacts`
				const options = { method: "GET" } 
				const response = await fetch(uri, options) 
				if (!response.ok) {
					console.log("ERROR", response.status, response.statusText)
					return
				}
				const data = await response.json()
				console.log(data)
				setStore({ listContacts: data.contacts })
			},
			deleteContact: async (id) => {
				console.log(id, "este es el id que recibe el actions.deleteContact");
				const uri = `${host}/agendas/${user}/contacts/${id}`
				const options = { method: "DELETE" }
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("ERROR: ", response.status, response.statusText)
					return
				}

				getActions().getContacts();
			},
			updateContact: async () => {
				const uri = `${host}/agendas/${user}/contacts/${getStore().currentContact.id}`
				const options = { method: "PUT", body: JSON.stringify(getStore().currentContact), headers: {'Content-Type': 'application/json'} }
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("ERROR: ", response.status, response.statusText)
					return
				}
				getActions().getContacts()
			},
			exampleFunction: () => { getActions().changeColor(0, "green"); },
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();

				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			}
		}
	};
};

export default getState;