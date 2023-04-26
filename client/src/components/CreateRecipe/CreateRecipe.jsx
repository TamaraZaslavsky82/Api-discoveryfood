import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDietas, postRecipe } from '../../Redux/actions';
import { Link, useHistory } from 'react-router-dom';
import '../CreateRecipe/CreateRecipe.css'




/* import './styles.css'; */

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const histori = useHistory();
  const diets = useSelector((state) => state.dietas);

  useEffect(() => {
    dispatch(getDietas());
  }, []);

  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: '',
    steps: '',
    image: '',
    diets: [],
   
  });
  console.log(input);

  //usamos un state para el error
  const [errors, setErrors] = useState({});

  function inputHandleChangue(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input)
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function rangeHhandleChangue(e) {
    const newinputrangue = {
      ...input,
      healthScore: e.target.value,
    };
    setInput(newinputrangue);
    console.log(input)
    setErrors(validate(newinputrangue));
  }
  function selectHandleDiet(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
      console.log(input)
      
    }
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value],
      })
    );
  }

  function handleStep(e) {
    setInput({
      ...input,
      steps: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postRecipe(input));
     alert('receta Creada con Exito');
    setInput({
      name: '',
      summary: '',
      healthScore: 1,
      steps: '',
      image: '',
      diets: [],
    });
    histori.push('/home');
  }
  function handleDelete(el) {
    const newinput = {
      ...input,
      diets: input.diets.filter((d) => d !== el),
    };
    setInput(newinput);
    setErrors(validate(newinput));
  }

  return (
    <>
      <div >
        

        <div >
          <div c>
            {/* <img src= alt="Imagen No Fount" /> */}
          </div>
          {/* ------------------Creacion del Formulario------------------ */}

          <div className="container__forms">
            <div className="container__logo">
              {/* <div>
                {!input.image.trim() ? (
                  <img src={food} alt="no hay imagen" width="300px" />
                ) : (
                  <img
                    src={input.image}
                    alt="no hay imagen"
                    width="300px"
                    height="270px"
                  />
                )}
              </div> */}
            </div>
            <div >
              <h1>NEW RECIPE</h1>
              <form onSubmit={handleSubmit}>
                <div >
                  <input
                    className={errors.name }
                    type="text"
                    placeholder="Agregar un nombre de Receta:"
                    onChange={inputHandleChangue}
                    name="name"
                    value={input.name}
                  />
                </div>
                {errors.name && <p >{errors.name}</p>}

                <div>
                  <textarea
                    name="summary"
                    cols="40"
                    rows="3"
                    value={input.summary}
                    onChange={inputHandleChangue}
                    placeholder="Ingrese una Description de la Receta"
                  />
                </div>
                {errors.summary && <p >{errors.summary}</p>}

                <div >
                  <span>{input.healthScore}</span>
                  <input
                    type="range"
                    name="healthScore"
                    min="1"
                    max="100"
                    value={input.healthScore}
                    onChange={rangeHhandleChangue}
                  />
                </div>
                {errors.healthScore && (
                  <p >{errors.healthScore}</p>
                )}

                <div className="input__text">
                  <textarea
                    name="steps"
                    cols="40"
                    rows="3"
                    value={input.steps}
                    placeholder="Ingrese los pasos par crear la receta"
                    onChange={handleStep}
                  />
                </div>

                <div className="input__text">
                  <input
                    type="text"
                    name="image"
                    placeholder="ruta imagen"
                    value={input.image}
                    onChange={inputHandleChangue}
                  />
                </div>

                <div>
                <select name="diets" onChange={(e) => selectHandleDiet(e)}>
  <option value="">--Seleccione una Dieta--</option>
  {diets?.map((el) => (
    <option key={el.id} value={el.name}>
      {el.name}
    </option>
  ))}
</select>

<ul>
  {input.diets.map((el) => (
    <li key={el}>{el}</li>
  ))}
</ul>

                </div>
                {errors.diets && <p >{errors.diets}</p>}
                {!input.name || !input.summary || !input.diets.length ? (
                  <div >
                    <input
                      type="submit"
                      value=" Add Recipe"
                     
                      disabled
                    />
                  </div>
                ) : (
                  <div >
                    <input
                      type="submit"
                      value=" Add Recipe"
                     
                    />
                  </div>
                )}
              </form>
              <div>
                {/* <img
                  src={logo_booton}
                  alt="no foun"
                  className={s.logo_bootom}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// creamos la funcion de validacion
export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = '! Recipe  is required';
  } else if (!input.summary) {
    errors.summary = '! summary  is required';
  } else if (!input.healthScore) {
    errors.healthScore = '! healthScore  is required';
  } else if (!input.diets.length) {
    errors.diets = 'Seleccione al menos una Dieta';
  }

  return errors
}