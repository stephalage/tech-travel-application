import React, { useEffect, useState, useContext } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import CartContext from '../../context/cart';
import { Container, List, Unit } from './styles';
import api from '../../services/api';

function Home() {
    const [travelList, setTravelList] = useState([]);
    const {state, setState} = useContext(CartContext);

    useEffect(()=> {
        async function getTravelList(){
            const { data } = await api.get('/travel');
            setTravelList(data);
        }
        getTravelList();
    }, []);


    function handleAddToCart(travel) {
        const copyCart = [...state.cart];
        const travelIndex = copyCart.findIndex((el) => el.id === travel.id);
        if(travelIndex >= 0){
            copyCart[travelIndex].quantity += 1;
        }else{
            copyCart.push({ ... travel, quantity: 1});
        }



        setState({
            cart: copyCart,
        });
    }


    return (
        <Container>
            <List>
                {travelList.map((elemento) => (
                    <Unit>
                        <img src={elemento.photo} alt="Travel" />
                        <p>{elemento.title}</p>
                        <strong>{elemento.price}</strong>

                        <button type="button" onClick={() => handleAddToCart(elemento)}>
                            <div>
                                <MdAddShoppingCart size={16} color="#fff" />
                            </div>
                            <span>Agregar al carrito</span>
                        </button>
                    </Unit> 
                ))}
            </List>
        </Container>
    );
}

export default Home;