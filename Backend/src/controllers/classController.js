import Class from '../models/class.js';

export const getClasses = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { title: { $regex: search, $options: 'i' } };
    }

    const classes = await Class.find(query);
    res.json(classes);
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getClassById = async (req, res) => {
  try {
    const gymClass = await Class.findById(req.params.id);
    if (!gymClass) return res.status(404).json({ message: 'Class not found' });
    res.json(gymClass);
  } catch (error) {
    console.error('Get class by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createClass = async (req, res) => {
  try {
    if (!['admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Admin only' });
    }

    const gymClass = await Class.create(req.body);
    res.status(201).json(gymClass);
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateClass = async (req, res) => {
  try {
    if (!['admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Admin only' });
    }

    const gymClass = await Class.findById(req.params.id);
    if (!gymClass) return res.status(404).json({ message: 'Class not found' });

    const { title, description, trainer, time, date, category, maxParticipants, imageUrl } =
      req.body;

    if (title) gymClass.title = title;
    if (description) gymClass.description = description;
    if (trainer) gymClass.trainer = trainer;
    if (time) gymClass.time = time;
    if (date) gymClass.date = date;
    if (category) gymClass.category = category;
    if (maxParticipants) gymClass.maxParticipants = maxParticipants;
    if (imageUrl) gymClass.date = date;

    await gymClass.save();
    res.json(gymClass);
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteClass = async (req, res) => {
  try {
    if (!['admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Admin only' });
    }

    const gymClass = await Class.findById(req.params.id);
    if (!gymClass) return res.status(404).json({ message: 'Class not found' });

    await Class.deleteOne({ _id: req.params.id });

    res.json({ message: 'Class deleted' });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
