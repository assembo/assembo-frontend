export default function LoginHeader() {
  return (
    <div className="text-center">
      <h1 className="font-30 font-700 color-dark-dark">
        <img
          className="rounded-s mt-1 mb-2"
          src={require("../../assets/img/logo.png").default}
          style={({ width: "60px" }, { height: "60px" })}
          alt="assembo_logo"
        />
        Assembo
      </h1>
      <p className="color-dark-dark opacity-60 mt-2 mb-3 font-16">超快速信息同步 全任务版本控制</p>
      <p className="boxed-text-xl color-white opacity-50 pt-3 font-15"></p>
    </div>
  );
}
