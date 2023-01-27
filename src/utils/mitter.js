import mitt from "mitt";
const emitter = {};
const em= mitt();
emitter.$on = em.on;
emitter.$off = em.off;
emitter.$emit = em.emit;
export default emitter
