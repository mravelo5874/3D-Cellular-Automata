export class Statistics {
    constructor(store) {
        this.store = store;
        this.data = {
            completed_blocks: 0,
            frame_time: 0,
            total_blocks: 0
        };
    }

    force_update() {
        this.store.dispatch((dispatch) => {
            setTimeout(() => {
                dispatch({
                    type: 'stats.update',
                    value: this
                });
            }, 0);
        });
    }

    recieve(key, value=undefined) {
        if (value !== undefined) {
            this.recieve_key(key, value);
        } else {
            this.recieve_batch(key);
        }
    }

    recieve_key(key, value) {
        this.data[key] = value;
        this.data = {...this.data};
        this.force_update();
    }

    recieve_batch(data) {
        for (let key in data) {
            let value = data[key];
            this.data[key] = value;
        }
        this.data = {...this.data};
        this.force_update();
    }

}