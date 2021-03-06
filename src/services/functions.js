export function reject(obj, keys) {
  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .map(k => Object.assign({}, { [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {});
};

export function retry(fn, retriesLeft = 10, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, interval, retriesLeft - 1).then(resolve, reject);
        }, interval);
      });
  });
}

export function getBadge(status) {
  switch (status) {
    case 'Coletado': return 'success'
    case 'Aguardando Coleta': return 'warning'
    case 'Aguardando Confirmação': return 'danger'
    default: return 'primary'
  }
}
