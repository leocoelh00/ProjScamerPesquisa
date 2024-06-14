import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import packageInfo from '../../package.json';

const uri = environment.CONS_URL_APIBASE + environment.CONS_URL_GRAPH_ENDPOINT; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    const auth = setContext((operation, context) => {
        const token: any = sessionStorage.getItem(environment.SESSION_NAME);

        if (!token) {
            return {};
        } else {
            return {
                headers: {
                    "x-version": packageInfo.version,
                    Authorization: `Bearer ${JSON.parse(token)?.ds_Access_Token?.replace('"', "").replace('"', "")}`,
                },
            };
        }
    });


    return {
        link: ApolloLink.from([auth, httpLink.create({ uri })]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
            },
            query: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            },
            mutate: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            }
        }
    };
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule { }
