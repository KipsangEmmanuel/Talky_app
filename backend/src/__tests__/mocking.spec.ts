import {v4} from 'uuid';

jest.mock('uuid', () => ({
    v4: jest.fn()
}))

describe("This mocks the uuid", () => {

    it("generates a unique id", () => {
        const id = v4()
        const mockedv4 = jest.requireMock('uuid').v4
        mockedv4.mockImplementation(() => 'uniqueid_gygfsf_navsv')
    })
})