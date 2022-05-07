const Synonym = [
  [ "update", "tick" ],
  [ "alarm" ]
];

/**
 * Stopwatch event type
 */
const Type = Object.create( Object.prototype, {

    "Update": {
        enumerable: true,
        value: "update"
    },

    "Tick": {
        enumerable: true,
        value: "tick"
    },

    "Alarm": {
        enumerable: true,
        value: "alarm"
    },

    "getSynonyms": {
      value: function(): string[][] {

          return Synonym.map( ( synonymGroup ) => {

              return synonymGroup.slice();

          } );

      }
    },

    "getSynonym": {
        value: function( type: string ): string[] {

            const synonymGroup = Synonym.find( ( synonymGroup ) => {

                return -1 < synonymGroup.indexOf( type );

            } );

            if( synonymGroup == null ){
                return [];
            }

            return synonymGroup.slice();

        }
    }

} );

export default Type;