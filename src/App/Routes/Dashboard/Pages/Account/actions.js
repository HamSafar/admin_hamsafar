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
        mutation updateProfile($adminId: String!, $adminName: String!, $placeId: String!, $placeHeader: String!, $placeDetail: String!) {
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
)

export { GET_PROFILE, UPDATE_PROFILE }