class ProxyFactory {

    static create(target, props, action) {
        return new Proxy(target, {

            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {
                        console.log(`Interceptando ${prop}`)
                        Reflect.apply(target[prop], target, arguments)
                        return action(target) //this target is the original object that is being proxying
                    }
                }
                return Reflect.get(target, prop, receiver)
            },

            set(target, prop, value, receiver) {

                if (props.includes(prop)) {
                    target[prop] = value
                    action(target)
                }
                return Reflect.set(target, prop, value, receiver)
            }
        })
    }

    static _ehFuncao(prop) {
        return typeof(Function) == typeof(prop)
    }
}