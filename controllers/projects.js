import Projects from "../models/Projects.js";

/* CREATE */
export const createProject = async (req, res) => {
  try {
    const { id, description, picturePath ,title, link } = req.body;
    // const user = await User.findById(id);
    const newProject = new Projects({
      id,
      title,
      description,
      picturePath,
      link
    });
    await newProject.save();

    const projects = await Projects.find();
    res.status(201).json(projects);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteProject= async (req, res, next) => {
  try {
  const project = await Projects.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(204).json({
    status: 'success',
    poster
  });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
