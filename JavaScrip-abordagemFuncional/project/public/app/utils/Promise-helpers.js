export const handleStatus = res => res.ok ? res.json() : Promise.reject(res.statusText);

export const log = param => {

    console.log(param);
    return param;
}

export const timeoutPromise = (millisecond, promise) => {

    const timeout = new Promise((resolve, reject) =>

        setTimeout(() => reject(`Limite da promise excedido (limite: ${millisecond} ms)`), millisecond)
    );

    return Promise.race([promise, timeout])
}

export const delay = millisecond => data =>
    new Promise((resolve, reject) => setTimeout(() => resolve(data), millisecond));

export const retry = (retries, millisecond, fn) =>
    fn().catch(err => {

        console.log(retries)

        return delay(millisecond)()
            .then(() =>
                retries > 1 ?
                retry(--retries, millisecond, fn) :
                Promise.reject(err)
            )
    });