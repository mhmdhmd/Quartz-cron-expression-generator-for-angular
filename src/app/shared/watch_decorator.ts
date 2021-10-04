import { OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

export function Watch() : PropertyDecorator & MethodDecorator{
    function isOnChanges(val: OnChanges): val is OnChanges{
        return !!(val as OnChanges).ngOnChanges
    }
    return (target : any, key: string | symbol, propDesc?: PropertyDescriptor) => {
        let privateKey = "_" + key.toString();
        let isNotFirstChangePrivateKey = "_" + key.toString() + 'IsNotFirstChange';
        propDesc = propDesc || {
            configurable: true,
            enumerable: true,
        };
        propDesc.get = propDesc.get || (function (this: any) { return this[privateKey] });

        const originalSetter = propDesc.set || (function (this: any, val: any) { this[privateKey] = val });

        propDesc.set = function (this: any, val: any) {
            let oldValue = this[key];
            if(val != oldValue) {
                originalSetter.call(this, val);
                let isNotFirstChange = this[isNotFirstChangePrivateKey];
                this[isNotFirstChangePrivateKey] = true;
                if(isOnChanges(this)) {
                    var changes: SimpleChanges = {
                        [key]: new SimpleChange(oldValue, val, !isNotFirstChange)
                    }
                    this.ngOnChanges(changes);
                }
            }
        }
        return propDesc;
    }
}