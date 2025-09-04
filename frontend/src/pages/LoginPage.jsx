import "./LoginPage.css";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Loading } from "../componentes/Loading";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login, errors: authErrors, loading } = useAuth();

  const onSubmit = async (data) => {
    if (await login(data)) {
      navigate("/");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {authErrors?.length > 0 && (
        <div className="errors-api">
          {authErrors.map((e) => (
            <p className="error-message" key={e}>
              {e}
            </p>
          ))}
        </div>
      )}
      <section className="login-container">
        <div className="form-group">
          <div className="form-container logo-container">
            <img src="/logo-camiones.png" alt="" className="logo-login" />
          </div>
          <div className="form-container">
            <header>
              <h1>Inicio de sesión</h1>
              <h3>Por favor, ingrese sus credenciales</h3>
            </header>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <label>
                <span>Usuario:</span>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  name="username"
                  placeholder="miusuario"
                />
                {errors.username && (
                  <span className="error-form">Este campo es requerido</span>
                )}
              </label>

              <label>
                <span>Contraseña:</span>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  placeholder="mi contraseña"
                />
                {errors.password && (
                  <span className="error-form">Este campo es requerido</span>
                )}
              </label>

              <button>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
