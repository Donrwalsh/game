package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.model.Bar;
import com.bigbrass.game.rest.model.Completion;
import com.bigbrass.game.rest.model.Progress;
import com.bigbrass.game.rest.model.RequestPojo;
import com.bigbrass.game.rest.service.BarService;
import com.bigbrass.game.rest.service.CompletionService;
import com.bigbrass.game.rest.service.ProgressService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(BarControllerTest.class)
@ContextConfiguration(classes={BarController.class})
public class BarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BarService barService;

    @MockBean
    private CompletionService completionService;

    @MockBean
    private ProgressService progressService;

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            System.out.println(jsonContent);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testBeginBar() throws Exception {
        Bar bar = new Bar(2, 1, 60, false, 0);
        RequestPojo requestPojo = new RequestPojo(1, 2);

        Progress progress = new Progress(bar);

        when(progressService.startProgressBar(any())).thenReturn(progress);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/begin")
                .content(asJsonString(requestPojo))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"id\":null,\"userId\":2,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().toString() + "\",\"endTime\":\""
                        + progress.getEndTime().toString() + "\"}"))
                .andReturn();
    }

    @Test
    public void testCompleteBar() throws Exception {
        RequestPojo requestPojo = new RequestPojo(1, 2);

        Completion completion = new Completion(43);

        when(progressService.completeProgressBar(any())).thenReturn(completion);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/complete")
                .content(asJsonString(requestPojo))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":null,\"userId\":43,\"count\":0}"))
                .andReturn();
    }

    @Test
    public void testCompletions() throws Exception {
        Completion completion = new Completion(9);

        when(completionService.getCompletions(9)).thenReturn(completion);

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars/completions?userId=9")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":null,\"userId\":9,\"count\":0}"))
                .andReturn();
    }

    @Test
    public void testInitBars() throws Exception {
        Bar bar1 = new Bar(8, 1, 10, false, 0);
        Bar bar2 = new Bar(8, 2, 60, false, 0);
        Bar bar3 = new Bar(8, 3, 3600, false, 0);
        Progress progress = new Progress(bar1);
        when(progressService.findByUserId(8)).thenReturn(Arrays.asList(progress));
        when(barService.findByUserId(8)).thenReturn(Arrays.asList(bar1, bar2, bar3));

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars/init?userId=8")
                .accept(MediaType.APPLICATION_JSON);



        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"progresses\":[{\"id\":null,\"userId\":8,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().toString() + "\",\"endTime\":\""
                        + progress.getEndTime().toString() + "\"}],\"bars\":["
                        + "{\"id\":null,\"userId\":8,\"barNum\":1,\"durationSec\":10,\"auto\":false,\"autoCount\":0},"
                        + "{\"id\":null,\"userId\":8,\"barNum\":2,\"durationSec\":60,\"auto\":false,\"autoCount\":0},"
                        + "{\"id\":null,\"userId\":8,\"barNum\":3,\"durationSec\":3600,\"auto\":false,\"autoCount\":0}"
                        + "]}"))
                .andReturn();
    }

    @Test
    public void testSubmit() throws Exception {
        Bar bar1 = new Bar(8, 1, 10, false, 0);
        Bar bar2 = new Bar(8, 2, 60, false, 0);
        Bar bar3 = new Bar(8, 3, 3600, false, 0);
        List<Bar> barDetails = Arrays.asList(bar1, bar2, bar3);

        when(barService.saveBars(any())).thenReturn(barDetails);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/submit")
                .content(asJsonString(barDetails))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json("["
                    + "{\"id\":null,\"userId\":8,\"barNum\":1,\"durationSec\":10,\"auto\":false,\"autoCount\":0},"
                    + "{\"id\":null,\"userId\":8,\"barNum\":2,\"durationSec\":60,\"auto\":false,\"autoCount\":0},"
                    + "{\"id\":null,\"userId\":8,\"barNum\":3,\"durationSec\":3600,\"auto\":false,\"autoCount\":0}]"))
                .andReturn();



    }
}
