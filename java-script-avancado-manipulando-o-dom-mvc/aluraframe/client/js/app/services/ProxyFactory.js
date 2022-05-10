class ProxyFactory {

    static create(target, props, action) {
        return new Proxy(target, {

            get(target, prop, receiver) {
                if (props.includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`Interceptando ${prop}`)
                        Reflect.apply(target[prop], target, arguments)
                        return action(target)
                    }
                }
                return Reflect.get(target, prop, receiver)
            }
        })
    }
}