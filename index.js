const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Масив для імітації меню кафе
let menu = [
    { id: 1, name: 'Борщ', description: 'Традиційний український борщ', price: 50 },
    { id: 2, name: 'Піца Маргарита', description: 'Піца з томатами та моцарелою', price: 120 },
    { id: 3, name: 'Кава', description: 'Чорна кава', price: 40 }
];

// GET: Отримати всі страви
app.get('/menu', (req, res) => {
    res.status(200).json(menu);
});

// POST: Додати нову страву
app.post('/menu', (req, res) => {
    const { name, description, price } = req.body;
    const newDish = {
        id: menu.length + 1,
        name,
        description,
        price,
    };

    menu.push(newDish);
    res.status(201).json(newDish);
});

// GET: Отримати страву за ID
app.get('/menu/:id', (req, res) => {
    const dish = menu.find(item => item.id === parseInt(req.params.id));
    if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
});

// PATCH: Оновити інформацію про страву
app.patch('/menu/:id', (req, res) => {
    const dish = menu.find(item => item.id === parseInt(req.params.id));
    if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
    }

    const { name, description, price } = req.body;
    if (name) dish.name = name;
    if (description) dish.description = description;
    if (price) dish.price = price;

    res.status(200).json(dish);
});

// DELETE: Видалити страву
app.delete('/menu/:id', (req, res) => {
    const index = menu.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Dish not found' });
    }

    menu.splice(index, 1);
    res.status(200).json({ message: 'Dish deleted' });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
