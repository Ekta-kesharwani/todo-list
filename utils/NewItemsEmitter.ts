import emitter from './Emitter';

// eslint-disable-next-line no-shadow
export enum NewItemsEmitterActions {
    // eslint-disable-next-line no-unused-vars
    NewItemAdded
}
type NewItemEmitterData = {
    action: NewItemsEmitterActions
}
export const NewItemEmitter = emitter<NewItemEmitterData>();