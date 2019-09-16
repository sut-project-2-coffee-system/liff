import firebase from './Firebase'

export const loadmenu = () => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('menu');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newitem = [];
            let index = -1;
            for (let item in items) {
                index++
                newitem.push({
                    key: item,
                    image: items[item].image,
                    name: items[item].name,
                    no: index,
                    price: items[item].price,
                })
            }
            dispatch({
                type: 'menuList',
                payload: newitem
            })
        })
    }
}
