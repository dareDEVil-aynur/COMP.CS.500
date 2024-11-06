// controllers/eventController.js
const Event = require('../models/Event');

// Show all events
const all = async (req, res) => {
    const user = req.session.user;
    const events = await Event.find();
    return res.render('events/index', { title: 'Dashboard', user, events });
};

// Show form to create a new event
const create = (req, res) => {
    const user = req.session.user;

    // Retrieve validation errors and previous form data from the session if available
    const errors = req.session.errors || [];
    delete req.session.errors;

    const event = req.session.event || { name: "", date: "", description: "", status: "planned" };
    delete req.session.event;

    return res.render('events/create', { title: 'Create a new event', user, event, errors });
};

// Store a new event
const store = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        return res.redirect('/events');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = [];
            for (let field in error.errors) {
                errors.push(error.errors[field].message);
            }
            req.session.errors = errors;
            return res.redirect('/events/create');
        }
    }
};

// Show form to edit an event
const edit = async (req, res) => {
    const user = req.session.user;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send();

    const errors = req.session.errors || [];
    delete req.session.errors;

    return res.render('events/edit', { title: `Edit ${req.params.id}`, user, event, errors });
};

// Update an event
const update = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: false, runValidators: true });
        if (!event) return res.status(404).send();
        return res.redirect('/events');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = [];
            for (let field in error.errors) {
                errors.push(error.errors[field].message);
            }
            req.session.errors = errors;
            return res.redirect(`/events/${req.params.id}`);
        }
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    return res.redirect('/events');
};

// Export the controller methods as an object
module.exports = {
    all,
    create,
    store,
    edit,
    update,
    delete: deleteEvent, // Exported as 'delete' but defined as 'deleteEvent' to avoid reserved keyword issues
};
