import React from 'react';
import { Typography, List, ListItem, ListItemIcon, TextField, ListItemSecondaryAction, IconButton, Divider, Fab } from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';

export interface IDrinks {
    title: string;
    count: number;
}
export const Drinks: React.FC = () => {
    const storage = sessionStorage.getItem('drinks');
    console.log(storage);
    const [drinks, setDrinks] = React.useState<IDrinks[]>(storage ? JSON.parse(storage) : [{ title: 'Cabernet sauvignon', count: 1 }]);
    const addDrink = () => {
        const newDrinks = [...drinks, { title: '', count: 1 }];
        setDrinks(newDrinks);
        sessionStorage.setItem('drinks', JSON.stringify(newDrinks));
    };

    const setDrink = (key: number, drink: IDrinks) => {
        drinks[key] = drink;
        setDrinks([...drinks]);
        sessionStorage.setItem('drinks', JSON.stringify(drinks));
    };
    return (
        <>
            <Typography component={'h1'} variant={'h4'} className={'header'}>
                Drinks
            </Typography>
            <List>
                {drinks.map((x, k) => (
                    <>
                        <ListItem>
                            <ListItemIcon>
                                <span>{x.count}</span>
                            </ListItemIcon>
                            <TextField value={x.title} onChange={e => setDrink(k, { ...x, title: e.target.value })} placeholder={'Drink name'} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label={'minus'} onClick={() => setDrink(k, { ...x, count: x.count - 1 })}>
                                    <Remove />
                                </IconButton>
                                <IconButton edge={'end'} aria-label={'add'} onClick={() => setDrink(k, { ...x, count: x.count + 1 })}>
                                    <Add />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
            <Fab color={'primary'} aria-label={'add'} className={'fab'} onClick={() => addDrink()}>
                <Add />
            </Fab>
        </>
    );
};
