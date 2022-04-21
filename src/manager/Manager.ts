/**
 * Manager
 * 
 * @description
 * Manager interface
 */
interface Manager<K, T> {

    put( k: K, t: T ): Manager<K, T>;
    remove( k: K ): boolean;
    get( k: K ): T;

}

export default Manager;