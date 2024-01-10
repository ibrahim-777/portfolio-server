import Posters from "../models/Posters.js";

/* CREATE */
export const createPoster = async (req, res) => {
  try {
    const { id, description, picturePath ,title, category } = req.body;
    // const user = await User.findById(id);
    const newPoster = new Posters({
      id,
      title,
      description,
      picturePath,
      category
    });
    await newPoster.save();

    const posters = await Posters.find();
    res.status(201).json(posters);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Posters.find();
    res.status(200).json(posters);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePoster = async (req, res, next) => {
  try {
  const poster = await Posters.findByIdAndDelete(req.params.id, req.body, {
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
