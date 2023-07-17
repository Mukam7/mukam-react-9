import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../schema/category";
import { request } from "../server/request";

import "./Categories.css";

const CategoriesP = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  const getData = useCallback(async () => {
    try {
      const { data } = await request.get("user", { params: { name: search } });
      setCategories(data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, [search]);

  useEffect(() => {
    getData();
  }, [getData]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const isValid = await categorySchema.isValid(data);
      if (isValid) {
        if (selected) {
          await request.put(`user/${selected}`, data);
        } else {
          await request.post("user", data);
        }
        reset({});
        getData();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (id) => {
    try {
      const { data } = await request.get(`user/${id}`);
      reset(data);
      openModal();
      setSelected(id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const check = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (check) {
        await request.delete(`user/${id}`);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const add = () => {
    reset({});
    openModal();
    setSelected(null);
  };

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="input-group-text" onClick={add}>
          Add
        </button>
      </div>
      <div className="row">
        {categories.map(({ name, avatar, description, id }) => (
          <div className="card" key={id}>
            <div className="card-img">
              <LazyLoadImage src={avatar} />
            </div>
            <div className="card-body">
              <h3>{name}</h3>
              <p>{description}</p>
              <button className="btn btn-primary" onClick={() => edit(id)}>
                Edit
              </button>
              <button
                className="btn btn-info"
                onClick={() => deleteCategory(id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <input
              {...register("name")}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          {errors.name && (
            <p role="alert" className="text-danger">
              {errors.name.message}
            </p>
          )}
          <div className="input-group mb-3">
            <input
              {...register("avatar")}
              type="text"
              className="form-control"
              placeholder="Image"
            />
          </div>
          {errors.avatar && (
            <p role="alert" className="text-danger">
              {errors.avatar.message}
            </p>
          )}
          <button className="btn btn-danger me-3" onClick={closeModal}>
            Close
          </button>
          <button type="submit" className="btn btn-success">
            {selected ? "Save" : "Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CategoriesP;
