/**
 * Manager
 * 
 * @description
 * Manager interface
 */
interface Manager<T, K> {

    add( t: T ): Manager<T, K>;
    remove( k: K ): boolean;
    get( k: K ): T;

}

export default Manager;