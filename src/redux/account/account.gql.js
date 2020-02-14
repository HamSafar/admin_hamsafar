export const GET_PROFILE = gql`
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