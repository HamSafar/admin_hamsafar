import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const GET_PROFILE = gql`
    query getProfile($adminId: String!, $placeIndex: Int!) {
        adminData: adminById(adminId: $adminId) {
            name
            username
        }
        placeData: allAdminsPlacesBySizeAndOffset(adminId: $adminId, size: 1, offset: $placeIndex) {
            id
            title
            header
            detail
            pictures {
                path
            }
            tag {
                title
            }
        }
    }
`

const UPDATE_PROFILE = gql`
    mutation EditProfile($adminId: String!, $adminName: String!, $placeId: String!, $placeHeader: String!, $placeDetail: String!) {
        adminData: editAdminById(adminId: $adminId, name: $adminName) {
            name
            username
        }
        placeData: editPlace(placeId: $placeId, header: $placeHeader, detail: $placeDetail) {
            id
            title
            header
            detail
            pictures {
                path
            }
            tag {
                title
            }
        }
    }
`

const AccountContainer = ({ user: { id: adminId }, place: { index: placeIndex } }) => (
    <Query query={GET_PROFILE} variables={{ adminId, placeIndex }}>
        {({ loading, error, data }) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error!</p>
            return <Mutation mutation={UPDATE_PROFILE} >
                { updateProfile => (
                    <Account data={data} updateProfile={updateProfile} />
                )}
            </Mutation>
        }}
    </Query>
)

export default AccountContainer