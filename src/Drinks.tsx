import React from 'react';
import { Typography, List, ListItem, ListItemIcon, TextField, ListItemSecondaryAction, IconButton, Divider, Fab } from '@material-ui/core';
import { Remove, Add, Delete } from '@material-ui/icons';

export interface IDrinks {
    title: string;
    count: number;
}
export const Drinks: React.FC = () => {
    const storage = localStorage.getItem('drinks');
    const [drinks, setDrinks] = React.useState<IDrinks[]>(storage ? JSON.parse(storage) : [{ title: 'Cabernet sauvignon', count: 1 }]);
    const addDrink = () => {
        const newDrinks = [...drinks, { title: '', count: 1 }];
        setDrinks(newDrinks);
        localStorage.setItem('drinks', JSON.stringify(newDrinks));
    };

    const setDrink = (key: number, drink: IDrinks) => {
        drinks[key] = drink;
        setDrinks([...drinks]);
        localStorage.setItem('drinks', JSON.stringify(drinks));
    };

    const removeDrink = (key: number) => {
        const newDrinks = drinks.filter((x, k) => k !== key);
        setDrinks(newDrinks);
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
                                <IconButton edge={'end'} aria-label={'remove'} onClick={() => removeDrink(k)}>
                                    <Delete />
                                </IconButton>
                                <IconButton aria-label={'minus'} onClick={() => setDrink(k, { ...x, count: x.count - 1 })}>
                                    <Remove />
                                </IconButton>
                                <IconButton aria-label={'add'} onClick={() => setDrink(k, { ...x, count: x.count + 1 })}>
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
